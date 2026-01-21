export default function Achievements() {
  const achievements = [
    'First Win',
    'Played 5 Games',
    'Top Score in Caro'
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Achievements</h2>

      <ul className="list-disc ml-5">
        {achievements.map((a, i) => (
          <li key={i}>{a}</li>
        ))}
      </ul>
    </div>
  );
}
