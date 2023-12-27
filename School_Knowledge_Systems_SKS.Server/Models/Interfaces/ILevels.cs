using School_Knowledge_Systems.Server.Models.DTOs;

namespace School_Knowledge_Systems.Server.Models.Interfaces
{
    public interface ILevels
    {
        Task<IEnumerable<LevelDTO>> GetLevels();
        Task<LevelDTO> GetLevel(string levelId);
        Task<LevelDTO> PutLevel(string id, LevelDTOPut level);
        Task<LevelDTO> PostLevel(LevelDTO level);
        Task<LevelDTO> DeleteLevel(string id);
    }
}
