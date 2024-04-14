import React, { useRef, useState } from 'react';
import { POST } from '../Servicios/api';

import Editor from '@monaco-editor/react';

export function EditorTexto() {
  const editorRef = useRef(null);
  const [resultado, setResultado] = useState("");

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function showValue() {
    //alert(editorRef.current.getValue());
    POST("http://localhost:3000/interpretar",editorRef.current.getValue()).then(res =>
  {
    console.log(res.resultado)
    setResultado(res.resultado)
  } )
    
  }

  return (
    <div style={{ display: 'flex', height: '90vh' }}>
      {/* Editor de Código a la Izquierda */}
      <div style={{ flex: '1', marginRight: '20px' }}>
        <Editor
          height="70vh"
          width="70vh"
          defaultLanguage="javascript"
          defaultValue="// PROYECTO 2 COMPILADORES"
          onMount={handleEditorDidMount}
          theme='vs-dark'
        />
        <hr />
        <button onClick={showValue}>Ejecutar</button>
        {/* Puedes agregar más controles o botones aquí si lo necesitas */}
      </div>

      {/* Consola (TextArea) a la Derecha */}
      <div style={{ flex: '1', marginLeft: '10px' }}>
        <textarea
          style={{ width: '70vh', height: '69vh', fontSize: '16px', fontFamily: 'monospace' }}
          value={resultado}
          readOnly
        />
      </div>
    </div>
  );
}
