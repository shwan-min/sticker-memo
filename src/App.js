import { observer } from 'mobx-react';
import Memo from './Memo/Memo';
import { Add } from '@mui/icons-material';
import { useCallback } from 'react';

function App({store}) {
  const AddMemo = useCallback(() => store.addMemo(), [store]);
  const Edit = useCallback((id, content) => store.editMemo(id, content), [store]);
  const SetSize = useCallback((id, width, height) => store.setSize(id, width, height),[store])
  const SetPosition = useCallback((id, x, y) => store.setPosition(id, x, y), [store]);
  const Delete = useCallback((id) => {store.removeMemo(id)},[store])
  
  return (
    <>
    {
      store.memos.map((memo) => 
        <Memo 
          key={memo.id}
          item={memo}
          Edit={Edit}
          SetSize={SetSize}
          SetPosition={SetPosition}
          Delete={Delete}
        />)
    }
    <Add 
      sx={{
        float:'right',
        backgroundColor: '#e4e4e4',
        borderRadius: 2,
        cursor: 'pointer',
        fontSize: 30,
        border: '1px solid black' }}
      onClick={AddMemo}
    />
    </>
  );
}

export default observer(App);
