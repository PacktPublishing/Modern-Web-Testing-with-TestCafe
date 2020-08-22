const { Selector } = require('testcafe');

const redminePage = require('./redmine-page4.js');

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
    await t.useRole(redminePage.regularUser)
        .click(redminePage.linkLogout)
        .expect(Selector(redminePage.blockLoggedAs).exists).notOk()
        .expect(Selector(redminePage.linkLogin).exists).ok();
});

fixture('Redmine entities creation tests')
    .page(redminePage.urlRedmine)
    .beforeEach(async (t) => {
        await t.useRole(redminePage.regularUser);
    });

test('Create a new project', async (t) => {
    await redminePage.createNewProject(redminePage.text1ProjectName);
    await t.expect(Selector(redminePage.blockNotification).innerText).eql(redminePage.textSuccessfulCreation)
        .expect(redminePage.getPageUrl()).contains(redminePage.urlProjectSettings);
});

test('Create a new issue', async (t) => {
    await redminePage.createNewProject(redminePage.text2ProjectName);
    await redminePage.createNewIssue(
        redminePage.link2TestProject,
        redminePage.text2IssueName,
        redminePage.text2IssueDescription
    );
    await t.expect(Selector(redminePage.blockNotification).innerText).contains(redminePage.textCreated);
});

test('Verify that the issue is displayed on a project page', async (t) => {
    await redminePage.createNewProject(redminePage.text3ProjectName);
    await redminePage.createNewIssue(
        redminePage.link3TestProject,
        redminePage.text3IssueName,
        redminePage.text3IssueDescription
    );
    await t.click(redminePage.linkProjects)
        .click(redminePage.link3TestProject)
        .click(redminePage.linkIssues)
        .expect(Selector(redminePage.linkIssueName).innerText).contains(redminePage.text3IssueName);
});

test('Upload a file', async (t) => {
    await redminePage.createNewProject(redminePage.text4ProjectName);
    await redminePage.uploadFile(redminePage.link4TestProject);
    await t.expect(Selector(redminePage.linkFileName).innerText).eql(redminePage.textFileName)
        .expect(Selector(redminePage.blockDigest).innerText).eql(redminePage.textChecksum);
});

fixture('Redmine entities editing tests')
    .page(redminePage.urlRedmine)
    .beforeEach(async (t) => {
        await t.useRole(redminePage.regularUser);
    });

test('Edit the issue', async (t) => {
    await redminePage.createNewProject(redminePage.text5ProjectName);
    await redminePage.createNewIssue(
        redminePage.link5TestProject,
        redminePage.text5IssueName,
        redminePage.text5IssueDescription
    );
    await t.click(redminePage.linkProjects)
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
    await redminePage.createNewProject(redminePage.text6ProjectName);
    await redminePage.createNewIssue(
        redminePage.link6TestProject,
        redminePage.text6IssueName,
        redminePage.text6IssueDescription
    );
    await t.click(redminePage.linkProjects)
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
    await redminePage.createNewProject(redminePage.text7ProjectName);
    await redminePage.createNewIssue(
        redminePage.link7TestProject,
        redminePage.text7IssueName,
        redminePage.text7IssueDescription
    );
    await t.navigateTo(redminePage.urlRedmineSearch)
        .typeText(redminePage.inputSearch, redminePage.text7IssueName)
        .click(redminePage.buttonSubmit)
        .expect(Selector(redminePage.blockSearchResults).innerText).contains(redminePage.text7IssueName);
});

fixture('Redmine entities deletion tests')
    .page(redminePage.urlRedmine)
    .beforeEach(async (t) => {
        await t.useRole(redminePage.regularUser);
    });

test('Delete the issue', async (t) => {
    await redminePage.createNewProject(redminePage.text8ProjectName);
    await redminePage.createNewIssue(
        redminePage.link8TestProject,
        redminePage.text8IssueName,
        redminePage.text8IssueDescription
    );
    await t.click(redminePage.linkProjects)
        .click(redminePage.link8TestProject)
        .click(redminePage.linkIssues)
        .click(Selector(redminePage.linkIssueName).withText(redminePage.text8IssueName))
        .setNativeDialogHandler(() => true)
        .click(redminePage.iconDelete)
        .expect(Selector(redminePage.linkIssueName).withText(redminePage.text8IssueName).exists).notOk()
        .expect(Selector(redminePage.blockNoData).innerText).eql(redminePage.textNoData);
});

test('Delete the file', async (t) => {
    await redminePage.createNewProject(redminePage.text9ProjectName);
    await redminePage.uploadFile(redminePage.link9TestProject);
    await t.click(redminePage.linkProjects)
        .click(redminePage.link9TestProject)
        .click(redminePage.linkFiles)
        .setNativeDialogHandler(() => true)
        .click(Selector(redminePage.linkFileName).withText(redminePage.textFileName).parent(redminePage.blockFile).find(redminePage.buttonAction).withAttribute('data-method', redminePage.dataMethodDelete))
        .expect(Selector(redminePage.linkFileName).withText(redminePage.textFileName).exists).notOk()
        .expect(Selector(redminePage.blockDigest).withText(redminePage.textChecksum).exists).notOk();
});
