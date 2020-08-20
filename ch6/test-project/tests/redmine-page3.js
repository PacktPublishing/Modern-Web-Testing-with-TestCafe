const { stamp } = require('js-automation-tools');

const randomDigits1 = stamp.getTimestamp();
const randomDigits2 = stamp.resetTimestamp();
const randomDigits3 = stamp.resetTimestamp();
const randomDigits4 = stamp.resetTimestamp();
const randomDigits5 = stamp.resetTimestamp();
const randomDigits6 = stamp.resetTimestamp();
const randomDigits7 = stamp.resetTimestamp();
const randomDigits8 = stamp.resetTimestamp();
const randomDigits9 = stamp.resetTimestamp();

let redminePage = {
    urlRedmine: 'http://demo.redmine.org/',
    emailRegularUser: `test_user_testcafe_poc${randomDigits1}@sharklasers.com`,
    passwordRegularUser: 'test_user_testcafe_poc',

    linkLogin: '.login',
    inputUsername: '#username',
    inputPassword: '#password',
    linkRegister: '.register',
    inputUserLogin: '#user_login',
    inputUserPassword: '#user_password',
    inputUserPasswordConfirmation: '#user_password_confirmation',
    inputUserFirstName: '#user_firstname',
    inputUserLastName: '#user_lastname',
    inputUserMail: '#user_mail',
    blockNotification: '#flash_notice',
    blockLoggedAs: '#loggedas',
    linkLogout: '.logout',
    linkProjects: '#top-menu .projects',
    iconAdd: '.icon-add',
    inputProjectName: '#project_name',
    urlProjectSettings: `/projects/test_project${randomDigits1}/settings`,
    linkNewIssue: '.new-issue',
    inputIssueSubject: '#issue_subject',
    inputIssueDescription: '#issue_description',
    dropdownIssuePriority: '#issue_priority_id',
    optionIssuePriority: '#issue_priority_id option',
    linkIssues: '#main-menu .issues',
    linkIssueName: '.subject a',
    linkFiles: '.files',
    inputChooseFiles: 'input.file_selector',
    pathToFile: './uploads/test-file.txt',
    linkFileName: '.filename',
    blockDigest: '.digest',
    iconEdit: '.icon-edit',
    keyDelete: 'delete',
    urlRedmineSearch: 'http://demo.redmine.org/search',
    inputSearch: '#search-input',
    blockSearchResults: '#search-results',
    iconDelete: '.icon-del',
    blockNoData: '.nodata',
    blockFile: '.file',
    buttonAction: '.buttons a',
    dataMethodDelete: 'delete',

    textFirstNameRegularUser: 'test_user',
    textLastNameRegularUser: 'testcafe_poc',
    textAccountActivated: 'Your account has been activated. You can now log in.',
    textSuccessfulCreation: 'Successful creation.',
    textHigh: 'High',
    textCreated: 'created.',
    textFileName: 'test-file.txt',
    textChecksum: 'd8e8fca2dc0f896fd7cb4cb0031ba249',
    textNormal: 'Normal',
    textSuccessfulUpdate: 'Successful update.',
    textNoData: 'No data to display'
};

const createButtonSelector = (text) => {
    return `[value="${text}"]`;
};
const createLinkTestProjectSelector = (randomDigits) => {
    return `[href*="/projects/test_project${randomDigits}"]`;
};
const createProjectNameText = (randomDigits) => {
    return `test_project${randomDigits}`;
};
const createIssueNameText = (randomDigits) => {
    return `Test issue ${randomDigits}`;
};
const createIssueDescriptionText = (randomDigits) => {
    return `Test issue description ${randomDigits}`;
};
const createIssueNameUpdatedText = (randomDigits) => {
    return `Issue ${randomDigits} updated`;
};

redminePage.buttonLogin = createButtonSelector('Login »');
redminePage.buttonSubmit = createButtonSelector('Submit');
redminePage.buttonCreate = createButtonSelector('Create');
redminePage.buttonAdd = createButtonSelector('Add');

redminePage.link2TestProject = createLinkTestProjectSelector(randomDigits2);
redminePage.link3TestProject = createLinkTestProjectSelector(randomDigits3);
redminePage.link4TestProject = createLinkTestProjectSelector(randomDigits8);
redminePage.link5TestProject = createLinkTestProjectSelector(randomDigits4);
redminePage.link6TestProject = createLinkTestProjectSelector(randomDigits5);
redminePage.link7TestProject = createLinkTestProjectSelector(randomDigits6);
redminePage.link8TestProject = createLinkTestProjectSelector(randomDigits7);
redminePage.link9TestProject = createLinkTestProjectSelector(randomDigits9);

redminePage.text1ProjectName = createProjectNameText(randomDigits1);
redminePage.text2ProjectName = createProjectNameText(randomDigits2);
redminePage.text3ProjectName = createProjectNameText(randomDigits3);
redminePage.text4ProjectName = createProjectNameText(randomDigits8);
redminePage.text5ProjectName = createProjectNameText(randomDigits4);
redminePage.text6ProjectName = createProjectNameText(randomDigits5);
redminePage.text7ProjectName = createProjectNameText(randomDigits6);
redminePage.text8ProjectName = createProjectNameText(randomDigits7);
redminePage.text9ProjectName = createProjectNameText(randomDigits9);

redminePage.text2IssueName = createIssueNameText(randomDigits2);
redminePage.text3IssueName = createIssueNameText(randomDigits3);
redminePage.text5IssueName = createIssueNameText(randomDigits4);
redminePage.text6IssueName = createIssueNameText(randomDigits5);
redminePage.text7IssueName = createIssueNameText(randomDigits6);
redminePage.text8IssueName = createIssueNameText(randomDigits7);

redminePage.text2IssueDescription = createIssueDescriptionText(randomDigits2);
redminePage.text3IssueDescription = createIssueDescriptionText(randomDigits3);
redminePage.text5IssueDescription = createIssueDescriptionText(randomDigits4);
redminePage.text6IssueDescription = createIssueDescriptionText(randomDigits5);
redminePage.text7IssueDescription = createIssueDescriptionText(randomDigits6);
redminePage.text8IssueDescription = createIssueDescriptionText(randomDigits7);

redminePage.text5IssueNameUpdated = createIssueNameUpdatedText(randomDigits4);
redminePage.text6IssueNameUpdated = createIssueNameUpdatedText(randomDigits5);

module.exports = redminePage;
