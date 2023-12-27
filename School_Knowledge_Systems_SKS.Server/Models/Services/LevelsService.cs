using Microsoft.EntityFrameworkCore;
using School_Knowledge_Systems.Server.Data;
using School_Knowledge_Systems.Server.Models.DTOs;
using School_Knowledge_Systems.Server.Models.Interfaces;

namespace School_Knowledge_Systems.Server.Models.Services
{
    public class LevelsService : ILevels
    {
        private readonly SKSDbContext _context;

        public LevelsService(SKSDbContext context)
        {
            _context = context;
        }

        public async Task<LevelDTO> DeleteLevel(string id)
        {
            if (_context.Levels == null)
            {
                return null;
            }
            var level = await _context.Levels.FindAsync(id);
            if (level == null)
            {
                return null;
            }

            _context.Levels.Remove(level);
            await _context.SaveChangesAsync();

            return (LevelDTO)level;
        }

        public async Task<LevelDTO> GetLevel(string levelId)
        {
            if (_context.Levels == null)
            {
                return null;
            }
            var level = await _context.Levels.FindAsync(levelId);

            if (level == null)
                return null;
            else
                return (LevelDTO)level;
        }

        public async Task<IEnumerable<LevelDTO>> GetLevels()
        {
            if (_context.Levels == null)
            {
                return null;
            }
            var levelsList = await _context.Levels.ToListAsync();
            IEnumerable<LevelDTO> IEnumLevels = levelsList.Select(level => (LevelDTO)level);
            return IEnumLevels;
        }

        public async Task<bool?> LevelExists(string id)
        {
            var exists = _context.Levels?.Any(e => e.LevelID == id);
            return exists;
        }

        public async Task<LevelDTO> PostLevel(LevelDTO level)
        {
            _context.Levels.Add((Level)level);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (await LevelExists(level.LevelID) == false)
                {
                    return null;
                }
                else
                {
                    throw;
                }
            }
            return level;
        }

        public async Task<LevelDTO> PutLevel(string id, LevelDTOPut level)
        {
            var currentLevel = await _context.Levels.FindAsync(id);

            if (currentLevel == null)
                return null;

            currentLevel.StudentsCount = level.StudentsCount;

            _context.Entry(currentLevel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (await LevelExists(id) == false)
                {
                    return null;
                }
                else
                {
                    throw;
                }
            }
            currentLevel.LevelID = id;
            return (LevelDTO)currentLevel;
        }
    }
}
