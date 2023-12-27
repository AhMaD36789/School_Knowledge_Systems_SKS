using Microsoft.AspNetCore.Mvc;
using School_Knowledge_Systems.Server.Models.DTOs;
using School_Knowledge_Systems.Server.Models.Interfaces;

namespace School_Knowledge_Systems.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubjectsController : ControllerBase
    {
        private readonly ISubject _subject;

        public SubjectsController(ISubject subject)
        {
            _subject = subject;
        }

        // GET: api/Subjects
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubjectDTO>>> GetSubjects()
        {
            var SubjectList = await _subject.GetSubjects();
            return SubjectList != null ? Ok(SubjectList) : NotFound();
        }

        // GET: api/Subjects/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SubjectDTO>> GetSubject(string id)
        {
            var subject = await _subject.GetSubject(id);
            return subject != null ? Ok(subject) : NotFound();
        }

        // PUT: api/Subjects/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSubject(string id, SubjectDTOPut subject)
        {
            var newSubject = await _subject.PutSubject(id, subject);
            return newSubject != null ? Ok(newSubject) : NotFound();
        }

        // POST: api/Subjects
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SubjectDTO>> PostSubject(SubjectDTO subject)
        {
            var createdSubject = await _subject.PostSubject(subject);
            return CreatedAtAction("GetSubject", new { id = subject.SubjectID }, createdSubject);
        }

        // DELETE: api/Subjects/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubject(string id)
        {
            var subject = await _subject.DeleteSubject(id);
            return subject != null ? Ok(subject) : NotFound();
        }
    }
}
