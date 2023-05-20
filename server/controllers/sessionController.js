/*
RMIT University Vietnam
 Course: COSC2430 Web Programming
 Semester: 2023A
 Assessment: Assignment 2
 Author: Group 10
 Acknowledgement: Acknowledge the resources that you use here.
*/


function createSession(req, user) {
  req.session.user = {
    username: user.username,
    type: user.type,
    loginTimestamp: new Date().getTime(),
  };
}

function sessionExpired(req) {
  if (req.session) {
    if (req.session.user) {
      const sessionTimeout = 60 * 60 * 1000;
      const currentTime = new Date().getTime();
      const loginTime = req.session.user.loginTimestamp;
      if (currentTime - loginTime > sessionTimeout) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  } else {
    return true;
  }
}

function hasSession(req) {
  if (req.session) {
    if (req.session.user) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function deleteSession(req) {
  delete req.session.user;
}

module.exports = {
  createSession,
  sessionExpired,
  deleteSession,
  hasSession,
};
