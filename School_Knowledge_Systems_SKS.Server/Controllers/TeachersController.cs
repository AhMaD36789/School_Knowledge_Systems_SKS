using Microsoft.AspNetCore.Mvc;
using School_Knowledge_Systems.Server.Models;
using School_Knowledge_Systems.Server.Models.DTOs;
using School_Knowledge_Systems.Server.Models.Interfaces;

namespace School_Knowledge_Systems.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeachersController : ControllerBase
    {
        private readonly ITeachers _Teachers;

        public TeachersController(ITeachers teacher)
        {
            _Teachers = teacher;
        }

        // GET: api/Teachers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TeacherDTO>>> GetTeachers()
        {
            var teachersList = await _Teachers.GetTeachers();
            return teachersList != null ? Ok(teachersList) : NotFound();
        }

        // GET: api/Teachers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TeacherDTO>> GetTeacher(int id)
        {
            var teacher = await _Teachers.GetTeacher(id);
            return teacher != null ? Ok(teacher) : NotFound();
        }

        // PUT: api/Teachers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTeacher(int id, TeacherDTOPut teacher)
        {
            var newTeacher = await _Teachers.PutTeacher(id, teacher);
            return newTeacher != null ? Ok(newTeacher) : NotFound();
        }

        // POST: api/Teachers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Teacher>> PostTeacher(TeacherDTO teacher)
        {
            var createdTeacher = await _Teachers.PostTeacher(teacher);
            return CreatedAtAction("GetTeacher", new { id = teacher.TeacherID }, createdTeacher);
        }

        // DELETE: api/Teachers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeacher(int id)
        {
            var teacher = await _Teachers.DeleteTeacher(id);
            return teacher != null ? Ok(teacher) : NotFound();
        }
    }
}
