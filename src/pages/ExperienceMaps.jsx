import React from 'react';

const ExperienceMaps = () => {
  const studentJourney = [
    {
      stage: 'Onboarding',
      emotions: 'Excited, Curious',
      thoughts: 'How do I get started?',
      actions: 'Sign up, Explore courses',
    },
    {
      stage: 'Learning',
      emotions: 'Engaged, Challenged',
      thoughts: 'Am I understanding this?',
      actions: 'Attend classes, Complete assignments',
    },
    {
      stage: 'Assessment',
      emotions: 'Anxious, Determined',
      thoughts: 'Am I prepared for the exam?',
      actions: 'Study, Take exams',
    },
    {
      stage: 'Completion',
      emotions: 'Proud, Relieved',
      thoughts: 'What’s next?',
      actions: 'Receive grades, Plan next steps',
    },
  ];

  const teacherJourney = [
    {
      stage: 'Preparation',
      emotions: 'Focused, Motivated',
      thoughts: 'How do I structure my course?',
      actions: 'Create syllabus, Prepare materials',
    },
    {
      stage: 'Teaching',
      emotions: 'Engaged, Supportive',
      thoughts: 'Are students understanding?',
      actions: 'Deliver lectures, Provide feedback',
    },
    {
      stage: 'Assessment',
      emotions: 'Objective, Fair',
      thoughts: 'Are the assessments fair?',
      actions: 'Create exams, Grade assignments',
    },
    {
      stage: 'Reflection',
      emotions: 'Reflective, Proud',
      thoughts: 'How can I improve?',
      actions: 'Review course outcomes, Plan improvements',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4" role="heading" aria-level="1">Experience Maps</h1>
      <div className="w-full max-w-4xl bg-white p-4 rounded shadow mb-4">
        <h2 className="text-2xl font-bold mb-4" role="heading" aria-level="2">Student Journey</h2>
        {studentJourney.map((stage, index) => (
          <div key={index} className="mb-4 p-4 bg-gray-300 rounded" role="region" aria-labelledby={`student-stage-${index}`}>
            <h3 id={`student-stage-${index}`} className="text-xl font-bold">{stage.stage}</h3>
            <p><strong>Emotions:</strong> {stage.emotions}</p>
            <p><strong>Thoughts:</strong> {stage.thoughts}</p>
            <p><strong>Actions:</strong> {stage.actions}</p>
          </div>
        ))}
      </div>
      <div className="w-full max-w-4xl bg-white p-4 rounded shadow">
        <h2 className="text-2xl font-bold mb-4" role="heading" aria-level="2">Teacher Journey</h2>
        {teacherJourney.map((stage, index) => (
          <div key={index} className="mb-4 p-4 bg-gray-300 rounded" role="region" aria-labelledby={`teacher-stage-${index}`}>
            <h3 id={`teacher-stage-${index}`} className="text-xl font-bold">{stage.stage}</h3>
            <p><strong>Emotions:</strong> {stage.emotions}</p>
            <p><strong>Thoughts:</strong> {stage.thoughts}</p>
            <p><strong>Actions:</strong> {stage.actions}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceMaps;