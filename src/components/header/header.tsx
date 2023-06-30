import NotePadImage from '../../assets/notePadIcon_48.png';
import './header.scss';

interface HeaderProps {
  currentDoc: string;
}

const subMenu = ['File'];

export default function Header({ currentDoc }: HeaderProps) {
  return (
    <header>
      <div className="topHeader">
        <img className="appIcon" src={NotePadImage} alt="note pad icon" />
        {currentDoc}
        <div className="appTitle"> - Notepad++</div>
      </div>
      {subMenu.length > 0 && (
        <div className="subMenu">
          {subMenu.map((menu,index) => {
            return <div key={index} className={`menu ${menu.toLowerCase().replace(/\s/g, '-')}`}>{menu}</div>;
          })}
        </div>
      )}
    </header>
  );
}
