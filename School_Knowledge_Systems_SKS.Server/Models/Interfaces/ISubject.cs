using School_Knowledge_Systems.Server.Models.DTOs;

namespace School_Knowledge_Systems.Server.Models.Interfaces
{
    public interface ISubject
    {
        Task<IEnumerable<SubjectDTO>> GetSubjects();
        Task<SubjectDTO> GetSubject(string subjectId);
        Task<SubjectDTO> PutSubject(string id, SubjectDTOPut subject);
        Task<SubjectDTO> PostSubject(SubjectDTO subject);
        Task<SubjectDTO> DeleteSubject(string id);
    }
}
