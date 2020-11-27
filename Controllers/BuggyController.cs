using HR.Errors;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace HR.Controllers
{
  public class BuggyController : BaseApiController
  {
    private readonly HumanResourcesContext _context;
    public BuggyController(HumanResourcesContext context)
    {
      _context = context;
    }

    [HttpGet("notfound")]
    public ActionResult GetNotFoundRequest()
    {
      var thing = _context.Employees.Find(12);
      if (thing == null)
      {
        return NotFound(new ApiResponse(404));
      }
      return Ok(thing);
    }

    [HttpGet("servererror")]
    public ActionResult GetServerError()
    {
      var thing = _context.Employees.Find(43);
      var thingToReturn = thing.ToString(); // thing should be null
      return Ok();
    }

    [HttpGet("badrequest")]
    public ActionResult GetBadRequest()
    {
      return BadRequest(new ApiResponse(400)); //returns 400
    }

    [HttpGet("badrequest/{id}")]
    public ActionResult GetNotFoundRequest(int id)
    {
      return Ok();
    }
  }
}