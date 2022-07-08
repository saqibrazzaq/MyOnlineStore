using auth.Dtos.User;
using auth.Entities;
using AutoMapper;

namespace MyOnlineStore
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // User
            CreateMap<AppIdentityUser, UserResponseDto>();
        }
    }
}
