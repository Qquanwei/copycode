import React, { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import * as atoms from './atoms';

function Item({ code, index }) {
    const containerRef = useRef(null);

    useEffect(() => {
        containerRef.current.innerHTML = code;

        return () => {
            containerRef.current.innerHTML = '';
        }
    }, []);

    return (
        <li ref={containerRef}></li>
    )
}

function List() {
    const list = useRecoilValue(atoms.codeList);
    return (
        <ol className="m-list">
            {
                [...list].reverse().map((i, index) => {
                    return (
                        <Item key={index} code={i.code} index={index}></Item>
                    );
                })
            }
        </ol>
    );
}

export default List;
