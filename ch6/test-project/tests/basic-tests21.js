const { Selector, ClientFunction, Role } = require('testcafe');

const redminePage = require('./redmine-page3.js');

const getPageUrl = ClientFunction(() => {
    return window.location.href;
});

const regularUser = Role(redminePage.urlRedmine, async (t) => {
    await t.click(redminePage.linkLogin)
        .typeText(redminePage.inputUsername, redminePage.emailRegularUser)
        .typeText(redminePage.inputPassword, redminePage.passwordRegularUser)
        .click(redminePage.buttonLogin);
});

fixture('Redmine log in tests').page(redminePage.urlRedmine);

test('Create a new user', async (t) => {
    await t.click(redminePage.linkRegister)
        .typeText(redminePage.inputUserLogin, redminePage.emailRegularUser)
        .typeText(redminePage.inputUserPassword, redminePage.passwordRegularUser)
        .typeText(redminePage.inputUserPasswordConfirmation, redminePage.passwordRegularUser)
        .typeText(redminePage.inputUserFirstName, redminePage.textFirstNameRegularUser)
        .typeText(redminePage.inputUserLastName, redminePage.textLastNameRegularUser)
        .typeText(redminePage.inputUserMail, redminePage.emailRegularUser)
        .click(redminePage.buttonSubmit)
        .expect(Selector(redminePage.blockNotification).innerText).eql(redminePage.textAccountActivated);
});

test('Log in', async (t) => {
    await t.click(redminePage.linkLogin)
        .typeText(redminePage.inputUsername, redminePage.emailRegularUser)
        .typeText(redminePage.inputPassword, redminePage.passwordRegularUser)
        .click(redminePage.buttonLogin)
        .expect(Selector(redminePage.blockLoggedAs).exists).ok();
});

test('Log out', async (t) => {
    await t.useRole(regularUser)
        .click(redminePage.linkLogout)
        .expect(Selector(redminePage.blockLoggedAs).exists).notOk()
        .expect(Selector(redminePage.linkLogin).exists).ok();
});

fixture('Redmine entities creation tests')
    .page(redminePage.urlRedmine)
    .beforeEach(async (t) => {
        await t.useRole(regularUser);
    });

test('Create a new project', async (t) => {
    await t.click(redminePage.linkProjects)
        .click(redminePage.iconAdd)
        .typeText(redminePage.inputProjectName, redminePage.text1ProjectName)
        .click(redminePage.buttonCreate)
        .expect(Selector(redminePage.blockNotification).innerText).eql(redminePage.textSuccessfulCreation)
        .expect(getPageUrl()).contains(redminePage.urlProjectSettings);
});

test('Create a new issue', async (t) => {
    await t.click(redminePage.linkProjects)
        .click(redminePage.iconAdd)
        .typeText(redminePage.inputProjectName, redminePage.text2ProjectName)
        .click(redminePage.buttonCreate)
        .click(redminePage.linkProjects)
        .click(redminePage.link2TestProject)
        .click(redminePage.linkNewIssue)
        .typeText(redminePage.inputIssueSubject, redminePage.text2IssueName)
        .typeText(redminePage.inputIssueDescription, redminePage.text2IssueDescription)
        .click(redminePage.dropdownIssuePriority)
        .click(Selector(redminePage.optionIssuePriority).withText(redminePage.textHigh))
        .click(redminePage.buttonCreate)
        .expect(Selector(redminePage.blockNotification).innerText).contains(redminePage.textCreated);
});

test('Verify that the issue is displayed on a project page', async (t) => {
    await t.click(redminePage.linkProjects)
        .click(redminePage.iconAdd)
        .typeText(redminePage.inputProjectName, redminePage.text3ProjectName)
        .click(redminePage.buttonCreate)
        .click(redminePage.linkProjects)
        .click(redminePage.link3TestProject)
        .click(redminePage.linkNewIssue)
        .typeText(redminePage.inputIssueSubject, redminePage.text3IssueName)
        .typeText(redminePage.inputIssueDescription, redminePage.text3IssueDescription)
        .click(redminePage.dropdownIssuePriority)
        .click(Selector(redminePage.optionIssuePriority).withText(redminePage.textHigh))
        .click(redminePage.buttonCreate)
        .click(redminePage.linkProjects)
        .click(redminePage.link3TestProject)
        .click(redminePage.linkIssues)
        .expect(Selector(redminePage.linkIssueName).innerText).contains(redminePage.text3IssueName);
});

test('Upload a file', async (t) => {
    await t.click(redminePage.linkProjects)
        .click(redminePage.iconAdd)
        .typeText(redminePage.inputProjectName, redminePage.text4ProjectName)
        .click(redminePage.buttonCreate)
        .click(redminePage.linkProjects)
        .click(redminePage.link4TestProject)
        .click(redminePage.linkFiles)
        .click(redminePage.iconAdd)
        .setFilesToUpload(redminePage.inputChooseFiles, redminePage.pathToFile)
        .click(redminePage.buttonAdd)
        .expect(Selector(redminePage.linkFileName).innerText).eql(redminePage.textFileName)
        .expect(Selector(redminePage.blockDigest).innerText).eql(redminePage.textChecksum);
});

fixture('Redmine entities editing tests')
    .page(redminePage.urlRedmine)
    .beforeEach(async (t) => {
        await t.useRole(regularUser);
    });

test('Edit the issue', async (t) => {
    await t.click(redminePage.linkProjects)
        .click(redminePage.iconAdd)
        .typeText(redminePage.inputProjectName, redminePage.text5ProjectName)
        .click(redminePage.buttonCreate)
        .click(redminePage.linkProjects)
        .click(redminePage.link5TestProject)
        .click(redminePage.linkNewIssue)
        .typeText(redminePage.inputIssueSubject, redminePage.text5IssueName)
        .typeText(redminePage.inputIssueDescription, redminePage.text5IssueDescription)
        .click(redminePage.dropdownIssuePriority)
        .click(Selector(redminePage.optionIssuePriority).withText(redminePage.textHigh))
        .click(redminePage.buttonCreate)
        .click(redminePage.linkProjects)
        .click(redminePage.link5TestProject)
        .click(redminePage.linkIssues)
        .click(Selector(redminePage.linkIssueName).withText(redminePage.text5IssueName))
        .click(redminePage.iconEdit)
        .selectText(redminePage.inputIssueSubject)
        .pressKey(redminePage.keyDelete)
        .typeText(redminePage.inputIssueSubject, redminePage.text5IssueNameUpdated)
        .click(redminePage.dropdownIssuePriority)
        .click(Selector(redminePage.optionIssuePriority).withText(redminePage.textNormal))
        .click(redminePage.buttonSubmit)
        .expect(Selector(redminePage.blockNotification).innerText).eql(redminePage.textSuccessfulUpdate);
});

test('Verify that the updated issue is displayed on a project page', async (t) => {
    await t.click(redminePage.linkProjects)
        .click(redminePage.iconAdd)
        .typeText(redminePage.inputProjectName, redminePage.text6ProjectName)
        .click(redminePage.buttonCreate)
        .click(redminePage.linkProjects)
        .click(redminePage.link6TestProject)
        .click(redminePage.linkNewIssue)
        .typeText(redminePage.inputIssueSubject, redminePage.text6IssueName)
        .typeText(redminePage.inputIssueDescription, redminePage.text6IssueDescription)
        .click(redminePage.dropdownIssuePriority)
        .click(Selector(redminePage.optionIssuePriority).withText(redminePage.textHigh))
        .click(redminePage.buttonCreate)
        .click(redminePage.linkProjects)
        .click(redminePage.link6TestProject)
        .click(redminePage.linkIssues)
        .click(Selector(redminePage.linkIssueName).withText(redminePage.text6IssueName))
        .click(redminePage.iconEdit)
        .selectText(redminePage.inputIssueSubject)
        .pressKey(redminePage.keyDelete)
        .typeText(redminePage.inputIssueSubject, redminePage.text6IssueNameUpdated)
        .click(redminePage.dropdownIssuePriority)
        .click(Selector(redminePage.optionIssuePriority).withText(redminePage.textNormal))
        .click(redminePage.buttonSubmit)
        .click(redminePage.linkIssues)
        .expect(Selector(redminePage.linkIssueName).innerText).eql(redminePage.text6IssueNameUpdated);
});

test('Search for the issue', async (t) => {
    await t.click(redminePage.linkProjects)
        .click(redminePage.iconAdd)
        .typeText(redminePage.inputProjectName, redminePage.text7ProjectName)
        .click(redminePage.buttonCreate)
        .click(redminePage.linkProjects)
        .click(redminePage.link7TestProject)
        .click(redminePage.linkNewIssue)
        .typeText(redminePage.inputIssueSubject, redminePage.text7IssueName)
        .typeText(redminePage.inputIssueDescription, redminePage.text7IssueDescription)
        .click(redminePage.dropdownIssuePriority)
        .click(Selector(redminePage.optionIssuePriority).withText(redminePage.textHigh))
        .click(redminePage.buttonCreate)
        .navigateTo(redminePage.urlRedmineSearch)
        .typeText(redminePage.inputSearch, redminePage.text7IssueName)
        .click(redminePage.buttonSubmit)
        .expect(Selector(redminePage.blockSearchResults).innerText).contains(redminePage.text7IssueName);
});

fixture('Redmine entities deletion tests')
    .page(redminePage.urlRedmine)
    .beforeEach(async (t) => {
        await t.useRole(regularUser);
    });

test('Delete the issue', async (t) => {
    await t.click(redminePage.linkProjects)
        .click(redminePage.iconAdd)
        .typeText(redminePage.inputProjectName, redminePage.text8ProjectName)
        .click(redminePage.buttonCreate)
        .click(redminePage.linkProjects)
        .click(redminePage.link8TestProject)
        .click(redminePage.linkNewIssue)
        .typeText(redminePage.inputIssueSubject, redminePage.text8IssueName)
        .typeText(redminePage.inputIssueDescription, redminePage.text8IssueDescription)
        .click(redminePage.dropdownIssuePriority)
        .click(Selector(redminePage.optionIssuePriority).withText(redminePage.textHigh))
        .click(redminePage.buttonCreate)
        .click(redminePage.linkProjects)
        .click(redminePage.link8TestProject)
        .click(redminePage.linkIssues)
        .click(Selector(redminePage.linkIssueName).withText(redminePage.text8IssueName))
        .setNativeDialogHandler(() => true)
        .click(redminePage.iconDelete)
        .expect(Selector(redminePage.linkIssueName).withText(redminePage.text8IssueName).exists).notOk()
        .expect(Selector(redminePage.blockNoData).innerText).eql(redminePage.textNoData);
});

test('Delete the file', async (t) => {
    await t.click(redminePage.linkProjects)
        .click(redminePage.iconAdd)
        .typeText(redminePage.inputProjectName, redminePage.text9ProjectName)
        .click(redminePage.buttonCreate)
        .click(redminePage.linkProjects)
        .click(redminePage.link9TestProject)
        .click(redminePage.linkFiles)
        .click(redminePage.iconAdd)
        .setFilesToUpload(redminePage.inputChooseFiles, redminePage.pathToFile)
        .click(redminePage.buttonAdd)
        .click(redminePage.linkProjects)
        .click(redminePage.link9TestProject)
        .click(redminePage.linkFiles)
        .setNativeDialogHandler(() => true)
        .click(Selector(redminePage.linkFileName).withText(redminePage.textFileName).parent(redminePage.blockFile).find(redminePage.buttonAction).withAttribute('data-method', redminePage.dataMethodDelete))
        .expect(Selector(redminePage.linkFileName).withText(redminePage.textFileName).exists).notOk()
        .expect(Selector(redminePage.blockDigest).withText(redminePage.textChecksum).exists).notOk();
});
