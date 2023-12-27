using School_Knowledge_Systems.Server.Models.DTOs;

namespace School_Knowledge_Systems.Server.Models.Interfaces
{
    public interface ISections
    {
        Task<IEnumerable<SectionDTO>> GetSections();
        Task<SectionDTO> GetSection(string studentID);
        Task<SectionDTO> PutSection(string id, SectionDTOPut student);
        Task<SectionDTO> PostSection(SectionDTO student);
        Task<SectionDTO> DeleteSection(string id);
        Task ShuffleStudentsAndDistribute();
    }
}
