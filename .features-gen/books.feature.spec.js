// Generated from: features/books.feature
import { test } from "../features/steps/fixtures.ts";

test.describe('Books', () => {

  test('get books', { tag: ['@api'] }, async ({ When, Then, ctx }) => { 
    await When('GET "/books"', null, { ctx }); 
    await Then('status is 200', null, { ctx }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/books.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":4,"tags":["@api"],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When GET \"/books\"","stepMatchArguments":[{"group":{"start":4,"value":"\"/books\"","children":[{"start":5,"value":"/books","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then status is 200","stepMatchArguments":[{"group":{"start":10,"value":"200"},"parameterTypeName":"int"}]}]},
]; // bdd-data-end