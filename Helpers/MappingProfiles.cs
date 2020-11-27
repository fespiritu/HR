using AutoMapper;
using Core.Entities;

namespace HR.Helpers
{
  public class MappingProfiles : Profile
  {
    public MappingProfiles()
    {
      CreateMap<Employee, EmployeeDto>();
      CreateMap<EmployeeDto, Employee>();
    }
  }
}