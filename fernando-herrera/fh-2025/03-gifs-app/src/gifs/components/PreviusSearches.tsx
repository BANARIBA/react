interface PreviusSearchesProps {
  searches: string[];
  onLabelClicked: (term: string) => void;
}

export const PreviusSearches = ({ searches, onLabelClicked }: PreviusSearchesProps) => {
  return (
    <div className="previous-searches">
      <h2>Busquedas previas</h2>
      <ul className="previous-searches-list">
        {searches.map((term: string) => (
          <li key={term} onClick={() => onLabelClicked(term)}>{term}</li>
        ))}
      </ul>
    </div>
  );
};
