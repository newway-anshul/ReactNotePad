import { useRef, useEffect, useState } from "react";
import "./doc.scss";
interface Line {
  lineId: number;
  data: string;
}
export default function Doc() {
  const [lines, setLines] = useState<Line[]>([
    {
      lineId: 1,
      data: "",
    },
  ]);
  const [shouldSetFocus, setShouldSetFocus] = useState(true);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (shouldSetFocus) {
      const newLineIndex = lines.length - 1;
      const newLineRef = lineRefs.current[newLineIndex];
      if (newLineRef) {
        newLineRef.focus();
        setShouldSetFocus(false);
      }
    }
  }, [lines, shouldSetFocus]);

  const addNewLine = (index: number) => {
    const nextLine = lines[index + 1];
    if (nextLine != undefined) {
      const nextLineRef = lineRefs.current[index + 1];
      if (nextLineRef) {
        nextLineRef.focus();
      }
    } else {
      const nextId = Math.max(...lines.map((line: Line) => line.lineId)) + 1;
      setLines([
        ...lines,
        {
          lineId: nextId,
          data: "",
        },
      ]);
      setShouldSetFocus(true);
    }
  };
  const handleContentChange = (
    e: React.FormEvent<HTMLDivElement>,
    lineId: number
  ) => {
    const updatedData = e.currentTarget.textContent || "";
    setLines((prevLines) =>
      prevLines.map((line) =>
        line.lineId === lineId ? { ...line, data: updatedData } : line
      )
    );
  };
  const removeLine = (index: number) => {
    const newLines = [...lines];
    newLines.splice(index, 1);
    if (newLines.length != 0) {
      setLines(newLines);
      setShouldSetFocus(true);
    }
  };
  const handleKeyUp = (
    e: React.KeyboardEvent<HTMLDivElement>,
    line: Line,
    index: number
  ) => {
    switch (e.key) {
      case "Enter":
        addNewLine(index);
        e.preventDefault();
        break;
      case "ArrowUp":
        const preRef = lineRefs.current[index - 1];
        if (preRef) {
          preRef.focus();
          e.preventDefault();
        }
        break;
      case "ArrowDown":
        const nextRef = lineRefs.current[index + 1];
        if (nextRef) {
          nextRef.focus();
          e.preventDefault();
        }
        break;
      case "Backspace":
        if (line.data.length == 0) {
          removeLine(index);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="appDoc">
      <div className="lineInfo">
        <div className="lineNumbers">
          {lines.map((line, index) => (
            <div key={line.lineId} className="lineNumber">
              {index + 1}
            </div>
          ))}
        </div>
      </div>
      <div className="lines">
        {lines.map((line, index) => (
          <div
            key={line.lineId}
            className={`line ${line.lineId}`}
            contentEditable
            ref={(ref) => (lineRefs.current[index] = ref)}
            onKeyDown={(e) => {
              handleKeyUp(e, line, index);
            }}
            onInput={(e) => {
              handleContentChange(e, line.lineId);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
