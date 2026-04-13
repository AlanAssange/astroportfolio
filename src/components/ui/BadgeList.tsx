interface BadgeListProps {
    items: string[];
  }
  
  export default function BadgeList({ items }: BadgeListProps) {
    return (
      <div className="badges-container">
        {items.map((item) => (
          <span key={item} className="badge">
            {item}
          </span>
        ))}
      </div>
    );
  }