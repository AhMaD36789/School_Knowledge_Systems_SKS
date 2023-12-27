using Microsoft.EntityFrameworkCore;
using School_Knowledge_Systems.Server.Data;
using School_Knowledge_Systems.Server.Models.DTOs;
using School_Knowledge_Systems.Server.Models.Interfaces;

namespace School_Knowledge_Systems.Server.Models.Services
{
    public class SubjectsService : ISubject
    {
        private readonly SKSDbContext _context;

        public SubjectsService(SKSDbContext context)
        {
            _context = context;
        }

        public async Task<SubjectDTO> DeleteSubject(string id)
        {
            var subject = await _context.Subjects.FindAsync(id);

            if (subject == null)
            {
                return null;
            }

            _context.Subjects.Remove(subject);
            await _context.SaveChangesAsync();

            return (SubjectDTO)subject;
        }

        public async Task<SubjectDTO> GetSubject(string subjectId)
        {
            var subject = await _context.Subjects.FindAsync(subjectId);

            return (SubjectDTO)subject;
        }

        public async Task<IEnumerable<SubjectDTO>> GetSubjects()
        {
            var subjectsList = await _context.Subjects.ToListAsync();
            IEnumerable<SubjectDTO> IEnumSubjects = subjectsList.Select(subject => (SubjectDTO)subject);
            return IEnumSubjects;
        }

        public async Task<SubjectDTO> PostSubject(SubjectDTO subject)
        {
            _context.Subjects.Add((Subject)subject);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                // Handle exception if needed
                throw;
            }

            return subject;
        }

        public async Task<SubjectDTO> PutSubject(string id, SubjectDTOPut subject)
        {
            var currentSubject = await _context.Subjects.FindAsync(id);

            if (currentSubject == null)
            {
                return null;
            }

            currentSubject.NoOfClassesPerWeek = subject.NoOfClassesPerWeek;
            currentSubject.LevelID = subject.LevelID;

            _context.Entry(currentSubject).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await SubjectExists(id))
                {
                    return null;
                }
                else
                {
                    throw;
                }
            }

            currentSubject.SubjectID = id;
            return (SubjectDTO)currentSubject;
        }

        private async Task<bool> SubjectExists(string id)
        {
            return await _context.Subjects.AnyAsync(e => e.SubjectID == id);
        }
    }
}
