using Microsoft.AspNetCore.Mvc;
using School_Knowledge_Systems.Server.Data;
using School_Knowledge_Systems.Server.Models;
using School_Knowledge_Systems.Server.Models.DTOs;
using School_Knowledge_Systems.Server.Models.Interfaces;

namespace School_Knowledge_Systems.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly SKSDbContext _context;
        private readonly IStudents _students;

        public StudentsController(SKSDbContext context, IStudents students)
        {
            _context = context;
            _students = students;
        }

        // GET: api/Students
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentDTO>>> GetStudents()
        {
            var StudentsList = await _students.GetStudents();
            return StudentsList != null ? Ok(StudentsList) : NotFound();
        }

        // GET: api/Students/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Student>> GetStudent(string id)
        {
            var student = await _students.GetStudent(id);
            return student != null ? Ok(student) : NotFound();
        }

        // PUT: api/Students/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudent(string id, StudentDTOPut student)
        {
            var updatedLevel = await _students.PutStudent(id, student);
            return updatedLevel != null ? Ok(updatedLevel) : NotFound();
        }

        // POST: api/Students
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Student>> PostStudent(StudentDTO student)
        {
            var createdLevel = await _students.PostStudent(student);
            if (createdLevel != null)
                return CreatedAtAction("GetStudent", new { id = student.Name }, createdLevel);
            else return StatusCode(500);
        }

        // DELETE: api/Students/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(string id)
        {
            if (_context.Students == null)
            {
                return NotFound();
            }
            var student = await _context.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }

            _context.Students.Remove(student);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
