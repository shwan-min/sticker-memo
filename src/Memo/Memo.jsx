import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import CloseIcon from "@mui/icons-material/Close";
import "./Memo.scss";
import Draggable from "@seunghwan-min/draggable";
import { debounce } from "underscore";
import { observer } from "mobx-react";

function Memo({ item, Delete, Edit, SetPosition, SetSize }) {
  const handle = useRef(null)
  const memoContainer = useRef(null)
  const onChangeMemo = useMemo(() => 
    debounce(e => Edit(item.id, e.target.value), 500), [item.id, Edit]
  )

  const onChangeSize = useMemo(() => debounce((entry) => {
    const  { width, height } = entry[0].contentRect;
    SetSize(item.id, width, height)
  }, 100),[item.id, SetSize])

  const onChanePosition = useCallback(
    (x,y) => {
      SetPosition(item.id, x, y)
    },
    [item.id, SetPosition],
  )

  const onClickDelete = useCallback(() => {Delete(item.id)}, [item.id, Delete],)

  useEffect(() => {
    return () => {
      onChangeMemo.cancel()
      onChangeSize.cancel()
    }
  }, [onChangeMemo, onChangeSize])

  useLayoutEffect(() => {
    let RO = new ResizeObserver(onChangeSize)
    RO.observe(memoContainer.current)
    return () => {
      RO.disconnect()
      RO = null
    }
  })

  return (
    <Draggable handleRef={handle} x={item.x} y={item.y} onMove={onChanePosition}>
    <div
      className="memo-container"
      style={{ width: `${item.width}px`, height: `${item.height}px` }}
      ref={memoContainer}
    >
      <div className="menu">
        <DragHandleIcon ref={handle} sx={{ cursor: "move", fontSize: "25px" }} />
        <CloseIcon
          sx={{ cursor: "pointer", fontSize: "25px", float: "right" }}
          onClick={onClickDelete}
        />
      </div>
      <textarea
        className="memo-text-area"
        defaultValue={item.content}
        name="txt"
        placeholder="Enter memo here"
        onChange={onChangeMemo}
      ></textarea>
    </div>
    </Draggable>
  );
}

export default observer(Memo);
