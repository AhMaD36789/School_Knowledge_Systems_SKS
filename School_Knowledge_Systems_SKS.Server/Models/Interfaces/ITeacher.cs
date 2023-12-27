using School_Knowledge_Systems.Server.Models.DTOs;

namespace School_Knowledge_Systems.Server.Models.Interfaces
{
    public interface ITeachers
    {
        Task<IEnumerable<TeacherDTO>> GetTeachers();
        Task<TeacherDTO> GetTeacher(int teacherId);
        Task<TeacherDTO> PutTeacher(int id, TeacherDTOPut teacher);
        Task<TeacherDTO> PostTeacher(TeacherDTO teacher);
        Task<TeacherDTO> DeleteTeacher(int id);
    }
}
