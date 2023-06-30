import './footer.scss';
export default function Footer() {
  return (
    <footer className='appFooter'>
        <div className="docType">Normal text file</div>
        <div className="docInfo">
            <div className='textLength'>length : 69</div>
            <div className='totalLines'>lines : 69</div>
        </div>
        <div className="cursorInfo">
            <div className='lineNumber'>ln : 69</div>
            <div className='colNumber'>col : 69</div>
            <div className="position">pos: 12</div>
        </div>
    </footer>
  )
}
