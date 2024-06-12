// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];

//checkscore
//If an assignment is not yet due, do not include it in the results or the average.
//Additionally, if the learner’s submission is late (submitted_at is past due_at), deduct 10 percent of the total points possible from their score for that assignment.

function getLearnerData(course, ag, submissions) {
  // here, we would process this data to achieve the desired result.
  let result = [];

  //get unique learners as id key value
  let uniqueLearnerID = [];
  for (let i = 0; i < submissions.length; i++) {
    // Check if the picked element is already printed
    let j;
    for (j = 0; j < i; j++)
      if (submissions[i].learner_id == submissions[j].learner_id) {
        break;
      }

    if (i == j) {
      uniqueLearnerID.push(submissions[i].learner_id);
    }
  }

  let score;
  let posiblescore;
  //for each student
  for (let i = 0; i < uniqueLearnerID.length; i++) {
    let sum = 0;
    //check submissions for student id
    for (let j = 0; j < submissions.length; j++) {
      if (submissions[j].learner_id == uniqueLearnerID[i]) {
        //console.log(submissions[j].learner_id == uniqueLearnerID[i]); //checkkkkkk
        //look at assignment id and compare dates
        for (let k = 0; k < ag.assignments.length; k++) {
          if (submissions[j].assignment_id == ag.assignments[k].id) {
            //console.log(submissions[j].assignment_id == ag.assignments[0].id); //checkkkkkk
            //look at due dates vs submission dates
            //if not assignment not due yet
            // if (
            //   new Date(submissions[j].submission.submitted_at) <
            //   new Date(ag.assignments[k].due_at)
            // ) {
            //   score = 0;
            //   posiblescore = 0;
            // }
            //if late
            if (
              new Date(submissions[j].submission.submitted_at) >
              new Date(ag.assignments[k].due_at)
            ) {
              score =
                submissions[j].submission.score -
                ag.assignments[k].points_possible * 0.1;
              posiblescore = ag.assignments[k].points_possible;
            }
            //if on time or earlier
            else {
              score = submissions[j].submission.score;
              posiblescore = ag.assignments[k].points_possible;
            }
          }
          console.log(score, posiblescore);
        }
      }
    }
  }

  // const result = [
  //   {
  //     id: 125,
  //     avg: 0.985, // (47 + 150) / (50 + 150)
  //     1: 0.94, // 47 / 50
  //     2: 1.0, // 150 / 150
  //   },
  //   {
  //     id: 132,
  //     avg: 0.82, // (39 + 125) / (50 + 150)
  //     1: 0.78, // 39 / 50
  //     2: 0.833, // late: (140 - 15) / 150
  //   },
  // ];

  return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);
