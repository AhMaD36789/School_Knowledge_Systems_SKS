using Microsoft.AspNetCore.Mvc;
using School_Knowledge_Systems.Server.Models.DTOs;
using School_Knowledge_Systems.Server.Models.Interfaces;

namespace School_Knowledge_Systems.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SectionsController : ControllerBase
    {
        private readonly ISections _sections;

        public SectionsController(ISections sections)
        {
            _sections = sections;
        }

        // GET: api/Sections
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SectionDTO>>> GetSections()
        {
            var sectionsList = await _sections.GetSections();
            return sectionsList != null ? Ok(sectionsList) : NotFound();
        }

        // GET: api/Sections/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SectionDTO>> GetSection(string id)
        {
            var section = await _sections.GetSection(id);
            return section != null ? Ok(section) : NotFound();
        }

        // PUT: api/Sections/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSection(string id, SectionDTOPut section)
        {
            var updatedSection = await _sections.PutSection(id, section);
            return updatedSection != null ? Ok(updatedSection) : NotFound();
        }

        // POST: api/Sections
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SectionDTO>> PostSection(SectionDTO section)
        {
            var createdSection = await _sections.PostSection(section);

            return CreatedAtAction("GetSection", new { id = section.SectionID }, createdSection);
        }

        // DELETE: api/Sections/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSection(string id)
        {
            var section = await _sections.DeleteSection(id);
            return section != null ? Ok(section) : NotFound();
        }
    }
}
