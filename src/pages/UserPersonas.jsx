import React from 'react';

const UserPersonas = () => {
  const personas = [
    {
      role: 'Student',
      demographics: {
        age: '18-25',
        education: 'Undergraduate',
        location: 'Urban',
      },
      goals: [
        'Achieve high grades',
        'Gain practical knowledge',
        'Secure internships and job placements',
      ],
      behaviors: [
        'Attends classes regularly',
        'Participates in extracurricular activities',
        'Uses online resources for study',
      ],
      painPoints: [
        'High tuition fees',
        'Balancing study and part-time work',
        'Limited access to practical experiences',
      ],
    },
    {
      role: 'Teacher',
      demographics: {
        age: '30-50',
        education: 'Postgraduate',
        location: 'Urban',
      },
      goals: [
        'Deliver effective lessons',
        'Engage students in learning',
        'Stay updated with the latest teaching methods',
      ],
      behaviors: [
        'Prepares lesson plans',
        'Uses technology in the classroom',
        'Attends professional development workshops',
      ],
      painPoints: [
        'Large class sizes',
        'Administrative workload',
        'Keeping students motivated',
      ],
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">User Personas</h1>
      {personas.map((persona, index) => (
        <div key={index} className="w-full max-w-4xl bg-white p-4 rounded shadow mb-4">
          <h2 className="text-xl font-bold mb-2">{persona.role}</h2>
          <div className="mb-2">
            <h3 className="text-lg font-bold">Demographics</h3>
            <p>Age: {persona.demographics.age}</p>
            <p>Education: {persona.demographics.education}</p>
            <p>Location: {persona.demographics.location}</p>
          </div>
          <div className="mb-2">
            <h3 className="text-lg font-bold">Goals</h3>
            <ul className="list-disc list-inside">
              {persona.goals.map((goal, idx) => (
                <li key={idx}>{goal}</li>
              ))}
            </ul>
          </div>
          <div className="mb-2">
            <h3 className="text-lg font-bold">Behaviors</h3>
            <ul className="list-disc list-inside">
              {persona.behaviors.map((behavior, idx) => (
                <li key={idx}>{behavior}</li>
              ))}
            </ul>
          </div>
          <div className="mb-2">
            <h3 className="text-lg font-bold">Pain Points</h3>
            <ul className="list-disc list-inside">
              {persona.painPoints.map((painPoint, idx) => (
                <li key={idx}>{painPoint}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserPersonas;