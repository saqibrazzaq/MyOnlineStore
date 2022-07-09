using AutoMapper;
using cities.Dtos.City;
using cities.Dtos.Country;
using cities.Dtos.State;
using cities.Dtos.TimeZone;
using cities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cities
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // City, state, countries reset data
            CreateMap<Models.DataSeed.Cities.Country, Country>()
                .ForMember(dest => dest.NativeName, opt => opt.MapFrom(src => src.native))
                .ForMember(dest => dest.CountryCode, opt => opt.MapFrom(src => src.iso3))
                .ForMember(dest => dest.PhoneCode, opt => opt.MapFrom(src => src.phone_code))
                .ForMember(dest => dest.CurrencyName, opt => opt.MapFrom(src => src.currency_name))
                .ForMember(dest => dest.CurrencySymbol, opt => opt.MapFrom(src => src.currency_symbol));
            CreateMap<Models.DataSeed.Cities.TimeZone, Entities.TimeZone>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.zoneName))
                .ForMember(dest => dest.TimeZoneName, opt => opt.MapFrom(src => src.tzName));
            CreateMap<Models.DataSeed.Cities.State, State>()
                .ForMember(dest => dest.StateCode, opt => opt.MapFrom(src => src.state_code));
            CreateMap<Models.DataSeed.Cities.City, City>();

            // Country
            CreateMap<Country, CountryResponseDto>();
            CreateMap<Country, CountryDetailResponseDto>();
            CreateMap<UpdateCountryRequestDto, Country>();
            CreateMap<CreateCountryRequestDto, Country>();

            // TimeZone
            CreateMap<Entities.TimeZone, TimeZoneResponseDto>();
            CreateMap<CreateTimeZoneRequestDto, Entities.TimeZone>();
            CreateMap<UpdateTimeZoneRequestDto, Entities.TimeZone>();

            // State
            CreateMap<State, StateResponseDto>();
            CreateMap<CreateStateRequestDto, State>();
            CreateMap<UpdateStateRequestDto, State>();

            // City
            CreateMap<City, CityResponseDto>();
            CreateMap<City, CityDetailResponseDto>()
                .ForMember(dest => dest.StateCode, opt => opt.MapFrom(src => src.State.StateCode))
                .ForMember(dest => dest.StateName, opt => opt.MapFrom(src => src.State.Name))
                .ForMember(dest => dest.CountryId, opt => opt.MapFrom(src => src.State.Country.CountryId))
                .ForMember(dest => dest.CountryCode, opt => opt.MapFrom(src => src.State.Country.CountryCode))
                .ForMember(dest => dest.CountryName, opt => opt.MapFrom(src => src.State.Country.Name));
            CreateMap<CreateCityRequestDto, City>();
            CreateMap<UpdateCityRequestDto, City>();
        }
    }
}
