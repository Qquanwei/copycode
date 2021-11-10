/* eslint-disable import/no-webpack-loader-syntax */
import React, { useRef, useEffect, useCallback } from 'react';
import stylecss from '!!raw-loader!./vendor/codemirror.css';
import { ToastContainer, toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import * as atoms from './atoms';
import 'react-toastify/dist/ReactToastify.css';
import './editor.css';


function Editor() {
    const editorRef = useRef(null);
    const copyContainerRef = useRef(null);
    const setCodeList = useSetRecoilState(atoms.codeList);
    const codemirrorRef = useRef(null);

    useEffect(() => {
        codemirrorRef.current = window.CodeMirror.fromTextArea(editorRef.current, {
            lineNumbers: false,
            mode: "jsx"
        });

        return () => {
            codemirrorRef.current.toTextArea();
        }
    }, []);


    const onClickCopy = useCallback(() => {
        const container = copyContainerRef.current;
        const type = "text/html";
        const plainType = "text/plain";
        const textHtml = (`
            <html lang="en">
                <head>
                    <meta charset="UTF-8"/>
                 <style>
                 ${ stylecss }
                </style>
                </head>
                <body>
                    ${container.getInnerHTML()}
                </body>
            </html>
        `);

        const blob = new Blob([textHtml], { type })
        const plainBlob = new Blob([ codemirrorRef.current.getValue() ], { type: plainType});
        navigator.clipboard.write([
            new window.ClipboardItem({
                [type]: blob,
                [plainType]: plainBlob
            })
        ]);
        toast('Copy successed !');

        setCodeList((list) => {
            return list.concat({
                code: container.getElementsByClassName('CodeMirror')[0].getInnerHTML()
            });
        });
    }, []);

    return (
        <div className="m-editor">
            <style>
                { stylecss }
            </style>
            <div ref={copyContainerRef}>
                <div className="code-editor">
                    <textarea cols="30" id="" name="" rows="10" ref={editorRef} defaultValue="function hello() {}">
                    </textarea>
                </div>
            </div>
            <div>
                <button onClick={onClickCopy}>Copy !</button>
            </div>

            <ToastContainer autoClose={2000}></ToastContainer>
        </div>
    );
}

export default Editor;
