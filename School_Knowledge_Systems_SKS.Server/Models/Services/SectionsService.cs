using Microsoft.EntityFrameworkCore;
using School_Knowledge_Systems.Server.Data;
using School_Knowledge_Systems.Server.Models.DTOs;
using School_Knowledge_Systems.Server.Models.Interfaces;

namespace School_Knowledge_Systems.Server.Models.Services
{
    public class SectionsService : ISections
    {
        private readonly SKSDbContext _context;

        public SectionsService(SKSDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<SectionDTO>> GetSections()
        {
            if (_context.Sections == null)
            {
                return null;
            }
            var sectionsList = await _context.Sections.ToListAsync();
            IEnumerable<SectionDTO> IEnumSections = sectionsList.Select(std => (SectionDTO)std);
            return IEnumSections;
        }

        public async Task<SectionDTO> GetSection(string sectionID)
        {
            if (_context.Sections == null)
            {
                return null;
            }
            var section = await _context.Sections.FindAsync(sectionID);

            if (section == null)
            {
                return null;
            }

            return (SectionDTO)section;
        }

        public async Task<bool?> SectionExists(string id)
        {
            var exists = _context.Sections?.Any(e => e.SectionID == id);
            return exists;
        }

        public async Task<SectionDTO> DeleteSection(string id)
        {
            if (_context.Sections == null)
            {
                return null;
            }
            var section = await _context.Sections.FindAsync(id);
            if (section == null)
            {
                return null;
            }

            _context.Sections.Remove(section);
            await _context.SaveChangesAsync();

            return (SectionDTO)section;
        }

        public async Task<SectionDTO> PostSection(SectionDTO section)
        {
            var newSection = (Section)section;
            newSection.SectionID = newSection.LevelID + " " + newSection.SectionID;

            await _context.Sections.AddAsync(newSection);

            // Dynamically distribute assigned students among sections
            var totalAssignedStudents = await _context.Levels
                .Where(l => l.LevelID == newSection.LevelID)
                .Select(l => l.StudentsCount)
                .FirstOrDefaultAsync();

            var allSections = await _context.Sections
                .Where(s => s.LevelID == newSection.LevelID)
                .ToListAsync();

            var sectionCount = allSections.Count;

            foreach (var s in allSections)
            {
                s.StudentCount = totalAssignedStudents / sectionCount;
                _context.Entry(s).State = EntityState.Modified;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return (SectionDTO)newSection;
        }

        public async Task<SectionDTO> PutSection(string id, SectionDTOPut section)
        {
            var currentSection = await _context.Sections.FindAsync(id);

            if (currentSection == null)
            {
                return null;
            }
            currentSection.LevelID = section.LevelID;
            currentSection.StudentCount = section.StudentCount;
            currentSection.NoOfClassesPerWeek = section.NoOfClassesPerWeek;

            _context.Entry(currentSection).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (await SectionExists(id) == false)
                {
                    return null;
                }
                else
                {
                    throw;
                }
            }
            currentSection.SectionID = id;
            return (SectionDTO)currentSection;
        }

        public async Task ShuffleStudentsAndDistribute()
        {
            try
            {
                // Get all sections in the level
                var allSections = await _context.Sections.ToListAsync();

                // Iterate through each section and get the students with their assigned section
                foreach (var section in allSections)
                {
                    var studentsWithSection = await _context.Students
                        .Where(student => student.Section.LevelID == section.LevelID)
                        .Select(student => new
                        {
                            Student = student,
                            SectionID = student.SectionID
                        })
                        .ToListAsync();

                    // Calculate the number of students to be added to the section
                    var studentsToAdd = studentsWithSection.Count / allSections.Count;

                    // Assign the students to the section
                    for (int i = 0; i < allSections.Count; i++)
                    {
                        var studentsForSection = studentsWithSection.Skip(i * studentsToAdd).Take(studentsToAdd);

                        foreach (var studentInfo in studentsForSection)
                        {
                            studentInfo.Student.SectionID = allSections[i].SectionID;
                            _context.Entry(studentInfo.Student).State = EntityState.Modified;
                        }

                        // Update the student count for each section
                        allSections[i].StudentCount = studentsForSection.Count();
                        _context.Entry(allSections[i]).State = EntityState.Modified;
                    }

                    // Calculate remaining students
                    var remainingStudents = studentsWithSection.Count % allSections.Count;

                    // Assign the remaining students to the first few sections
                    for (int i = 0; i < remainingStudents; i++)
                    {
                        var studentInfo = studentsWithSection.Skip(allSections.Count * studentsToAdd + i).FirstOrDefault();
                        if (studentInfo != null)
                        {
                            studentInfo.Student.SectionID = allSections[i].SectionID;
                            _context.Entry(studentInfo.Student).State = EntityState.Modified;
                            allSections[i].StudentCount++;
                            _context.Entry(allSections[i]).State = EntityState.Modified;
                        }
                    }
                }

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
                Console.WriteLine($"StackTrace: {ex.StackTrace}");

                throw new Exception("An error occurred while shuffling and distributing students.");
            }
        }

    }
}
