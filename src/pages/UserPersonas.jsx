import React from 'react';

const UserPersonas = () => {
  const personas = [
    {
      role: 'Student',
      name: 'Alex Johnson',
      demographics: {
        age: 20,
        gender: 'Male',
        education: 'Undergraduate',
        location: 'New York, USA',
      },
      goals: [
        'Complete the course with good grades',
        'Understand the subject deeply',
        'Get a good internship',
      ],
      behaviors: [
        'Attends classes regularly',
        'Participates in group discussions',
        'Uses online resources for additional learning',
      ],
      painPoints: [
        'Difficulty in understanding complex topics',
        'Time management issues',
        'Balancing studies with part-time job',
      ],
    },
    {
      role: 'Teacher',
      name: 'Dr. Emily Smith',
      demographics: {
        age: 45,
        gender: 'Female',
        education: 'PhD in Computer Science',
        location: 'San Francisco, USA',
      },
      goals: [
        'Provide quality education to students',
        'Stay updated with the latest in the field',
        'Publish research papers',
      ],
      behaviors: [
        'Prepares lectures in advance',
        'Engages students with interactive sessions',
        'Uses various teaching aids and tools',
      ],
      painPoints: [
        'Keeping students engaged',
        'Managing administrative tasks',
        'Balancing teaching and research',
      ],
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">User Personas</h1>
      {personas.map((persona, index) => (
        <div key={index} className="w-full max-w-4xl bg-white p-4 rounded shadow mb-4">
          <h2 className="text-xl font-bold mb-2">{persona.role}: {persona.name}</h2>
          <div className="mb-2">
            <strong>Demographics:</strong>
            <ul>
              {Object.entries(persona.demographics).map(([key, value]) => (
                <li key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}: {value}</li>
              ))}
            </ul>
          </div>
          <div className="mb-2">
            <strong>Goals:</strong>
            <ul>
              {persona.goals.map((goal, i) => (
                <li key={i}>{goal}</li>
              ))}
            </ul>
          </div>
          <div className="mb-2">
            <strong>Behaviors:</strong>
            <ul>
              {persona.behaviors.map((behavior, i) => (
                <li key={i}>{behavior}</li>
              ))}
            </ul>
          </div>
          <div className="mb-2">
            <strong>Pain Points:</strong>
            <ul>
              {persona.painPoints.map((painPoint, i) => (
                <li key={i}>{painPoint}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserPersonas;