import React, { useRef, useEffect, useCallback } from 'react';
import * as monaco from 'monaco-editor';

function Editor() {
    const editorRef = useRef(null);

    useEffect(() => {
        monaco.editor.create(editorRef.current, {
            language: 'javascript'
        });
    }, []);

    return (
        <div ref={editorRef}></div>
    );
}

export default Editor;
