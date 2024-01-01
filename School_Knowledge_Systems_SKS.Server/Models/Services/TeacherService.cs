using Microsoft.EntityFrameworkCore;
using School_Knowledge_Systems.Server.Data;
using School_Knowledge_Systems.Server.Models.DTOs;
using School_Knowledge_Systems.Server.Models.Interfaces;

namespace School_Knowledge_Systems.Server.Models.Services
{
    public class TeachersService : ITeachers
    {
        private readonly SKSDbContext _context;

        public TeachersService(SKSDbContext context)
        {
            _context = context;
        }

        public async Task<TeacherDTO> DeleteTeacher(int id)
        {
            var teacher = await _context.Teachers.FindAsync(id);

            if (teacher == null)
            {
                return null;
            }

            _context.Teachers.Remove(teacher);
            await _context.SaveChangesAsync();

            return (TeacherDTO)teacher;
        }

        public async Task<TeacherDTO> GetTeacher(int teacherId)
        {
            var teacher = await _context.Teachers.FindAsync(teacherId);

            return (TeacherDTO)teacher;
        }

        public async Task<TeacherSubjectDTO> GetTeacherWithSubjects(int teacherId)
        {
            var teacher = await _context.Teachers.Select(x => new TeacherSubjectDTO
            {
                TeacherID = teacherId,
                PhoneNumber = x.PhoneNumber,
                TeacherClassesPerWeek = x.TeacherClassesPerWeek,
                TeacherName = x.TeacherName,
                TaughtSubjects = _context.Subjects.Where(s => s.TeacherID == teacherId).ToList(),
            }).FirstOrDefaultAsync(tid => tid.TeacherID == teacherId);
            return teacher;
        }

        public async Task<IEnumerable<TeacherDTO>> GetTeachers()
        {
            var teachersList = await _context.Teachers.ToListAsync();
            IEnumerable<TeacherDTO> IEnumTeachers = teachersList.Select(teacher => (TeacherDTO)teacher);
            return IEnumTeachers;
        }

        public async Task<TeacherDTO> PostTeacher(TeacherDTO teacher)
        {
            _context.Teachers.Add((Teacher)teacher);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                // Handle exception if needed
                throw;
            }

            return teacher;
        }

        public async Task<TeacherDTO> PutTeacher(int id, TeacherDTOPut teacher)
        {
            var currentTeacher = await _context.Teachers.FindAsync(id);

            if (currentTeacher == null)
            {
                return null;
            }

            currentTeacher.TeacherName = teacher.TeacherName;
            currentTeacher.PhoneNumber = teacher.PhoneNumber;
            currentTeacher.TeacherClassesPerWeek = teacher.TeacherClassesPerWeek;

            _context.Entry(currentTeacher).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await TeacherExists(id))
                {
                    return null;
                }
                else
                {
                    throw;
                }
            }

            currentTeacher.TeacherID = id;
            return (TeacherDTO)currentTeacher;
        }

        private async Task<bool> TeacherExists(int id)
        {
            return await _context.Teachers.AnyAsync(e => e.TeacherID == id);
        }
    }
}
