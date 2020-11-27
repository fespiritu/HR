using System.Collections.Generic;
using Infrastructure.Data;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using AutoMapper;

namespace HR.Controllers
{
  public class EmployeesController : BaseApiController
  {
    private readonly IGenericRepository<Employee> _repo;
    private readonly IMapper _mapper;
    public EmployeesController(IGenericRepository<Employee> repo,
      IMapper mapper)
    {
      _mapper = mapper;
      _repo = repo;

    }

    [HttpGet]
    public async Task<ActionResult<List<Employee>>> GetEmployees()
    {
      var employees = await _repo.ListAllAsync();
      return Ok(employees);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Employee>> GetEmployee(int id)
    {
      return Ok(await _repo.GetByIdAsync(id));
    }

    [HttpPost]
    public ActionResult<Employee> Add(EmployeeDto employeeDto)
    {
      Employee toAdd = _mapper.Map<Employee>(employeeDto);

      _repo.Add(toAdd);
      bool result = _repo.Save();
      if (!result)
      {
        return new StatusCodeResult(StatusCodes.Status500InternalServerError);
      }

      return Ok(_mapper.Map<EmployeeDto>(toAdd));
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Employee>> Update(int id, [FromBody] EmployeeDto employeeDto)
    {
      var existingEmp = await _repo.GetByIdAsync(id);
      if (existingEmp == null)
      {
        return NotFound();
      }
      _mapper.Map(employeeDto, existingEmp);
      _repo.Update(existingEmp);
      bool result = _repo.Save();
      if (!result)
      {
        return new StatusCodeResult(StatusCodes.Status500InternalServerError);
      }

      return Ok(_mapper.Map<EmployeeDto>(existingEmp));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteEmployee(int id)
    {
      var row = await _repo.GetByIdAsync(id);
      if (row == null)
      {
        return NotFound();
      }
      _repo.Delete(row);
      bool result = _repo.Save();
      if (!result)
      {
        return new StatusCodeResult(StatusCodes.Status500InternalServerError);
      }

      return NoContent(); // 204
    }
  }
}