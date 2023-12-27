using Microsoft.EntityFrameworkCore;
using School_Knowledge_Systems.Server.Data;
using School_Knowledge_Systems.Server.Models.DTOs;
using School_Knowledge_Systems.Server.Models.Interfaces;

namespace School_Knowledge_Systems.Server.Models.Services
{
    public class StudentsService : IStudents
    {
        private readonly SKSDbContext _context;

        public StudentsService(SKSDbContext sKSDb)
        {
            _context = sKSDb;
        }

        public async Task<IEnumerable<StudentDTO>> GetStudents()
        {
            if (_context.Students == null)
            {
                return null;
            }
            var studentsList = await _context.Students.ToListAsync();
            IEnumerable<StudentDTO> IEnumStudents = studentsList.Select(std => (StudentDTO)std);
            return IEnumStudents;
        }

        public async Task<StudentDTO> GetStudent(string studentID)
        {
            if (_context.Students == null)
            {
                return null;
            }
            var student = await _context.Students.FindAsync(studentID);

            if (student == null)
            {
                return null;
            }

            return (StudentDTO)student;
        }

        public async Task<bool?> StudentExists(string id)
        {
            var exists = _context.Students?.Any(e => e.Name == id);
            return exists;
        }

        public async Task<StudentDTO> DeleteStudent(string id)
        {
            if (_context.Students == null)
            {
                return null;
            }
            var student = await _context.Students.FindAsync(id);
            if (student == null)
            {
                return null;
            }

            _context.Students.Remove(student);
            await _context.SaveChangesAsync();

            return (StudentDTO)student;
        }

        public async Task<StudentDTO> PostStudent(StudentDTO studentDTO)
        {
            try
            {
                var newStudent = (Student)studentDTO;
                await _context.Students.AddAsync(newStudent);

                // Update the associated section's student count
                var section = await _context.Sections.FindAsync(studentDTO.SectionID);
                if (section != null)
                {
                    section.StudentCount++;
                }

                // Update the associated level's student count
                var level = await _context.Levels.FindAsync(section.LevelID);
                if (level != null)
                {
                    level.StudentsCount++;
                }

                await _context.SaveChangesAsync();

                return (StudentDTO)newStudent;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<StudentDTO> PutStudent(string id, StudentDTOPut student)
        {
            var currentStudent = await _context.Students.FindAsync(id);

            if (currentStudent == null)
                return null;

            currentStudent.FatherPhoneNumber = student.FatherPhoneNumber;
            currentStudent.SectionID = student.SectionID;

            _context.Entry(currentStudent).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (await StudentExists(id) == false)
                {
                    return null;
                }
                else
                {
                    throw;
                }
            }
            currentStudent.Name = id;
            return (StudentDTO)currentStudent;
        }
    }
}
