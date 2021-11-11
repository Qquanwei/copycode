/* eslint-disable import/no-webpack-loader-syntax */
import React, { useRef, useEffect, useCallback, useState } from 'react';
import stylecss from '!!raw-loader!./vendor/codemirror.css';
import { ToastContainer, toast } from 'react-toastify';
import Checkbox from 'rc-checkbox';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import * as atoms from './atoms';
import 'react-toastify/dist/ReactToastify.css';
import './editor.css';


function Editor() {
    const editorRef = useRef(null);
    const copyContainerRef = useRef(null);
    const codemirrorRef = useRef(null);
    const [forceLineBreak, setForceLineBreak] = useState(false);

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
        const container = copyContainerRef.current.cloneNode(true);
        const type = "text/html";
        const plainType = "text/plain";
        const codeEle = container.querySelector('.CodeMirror-code');


        [...codeEle.children].forEach((child) => {
            if (forceLineBreak) {
                const br = document.createElement('br');
                codeEle.insertBefore(br, child);
            }
            const presentationHTML = child.children[0];
            presentationHTML.innerHTML = presentationHTML.innerHTML.replace(/^ +/, (str) => {
                const len = str.length;
                let ans = '';
                for (let i = 0; i < len; ++i) {
                    ans += '&nbsp';
                }
                return ans;
            })
        });

        const textHtml = (`
                <div>
                <style>
                 ${ stylecss }
                </style>
                    ${container.innerHTML}
                </dvi>
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
    }, [forceLineBreak]);

    console.log(forceLineBreak);

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
            <div className="actions">
                <div className="action">
                    <Checkbox checked={forceLineBreak} onChange={e => setForceLineBreak(e.target.checked)} />
                        强制换行
                </div>

                <AwesomeButton ripple type="primary" onPress={onClickCopy}>Copy !</AwesomeButton>
            </div>

            <ToastContainer autoClose={2000}></ToastContainer>
        </div>
    );
}

export default Editor;
