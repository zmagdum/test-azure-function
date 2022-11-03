import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest,
  toDoItem: any // the CosmosDB document fetched for us by the runtime
): Promise<void> {
  if (toDoItem === undefined) {
    context.res = { status: 404 };
    return;
  }

  context.bindings.outputDocument = {
    // our new log document
    id: context.invocationId,
    requestedId: req.query.id,
    timestamp: new Date(),
  };
  context.res = { body: toDoItem }; // the response to the HTTP client
};

export default httpTrigger;
