using School_Knowledge_Systems.Server.Models.DTOs;

namespace School_Knowledge_Systems.Server.Models.Interfaces
{
    public interface IStudents
    {
        Task<IEnumerable<StudentDTO>> GetStudents();
        Task<StudentDTO> GetStudent(string studentID);
        Task<StudentDTO> PutStudent(string id, StudentDTOPut student);
        Task<StudentDTO> PostStudent(StudentDTO student);
        Task<StudentDTO> DeleteStudent(string id);
    }
}
