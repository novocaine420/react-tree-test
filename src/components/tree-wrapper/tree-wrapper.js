import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import values from 'lodash/values';
import Tree from "../tree/tree";

const StyledTreeWrapper = styled.div`
  width: 800px;
  max-width: 100%;
  margin: 0 auto;
  display: flex;  
  flex-direction: column;
`;

const TreeWrapper = () => {
    const [expandedKeys, setExpandedKeys] = useState([]);

    useEffect(() => {
        localStorage.setItem('treeKeys', JSON.stringify(expandedKeys));
    }, [expandedKeys])

    const onExpand = useCallback((nodes) => {
        const expanded = [];
        values(nodes).forEach(node => {
            if(node.isExpanded === true) {
                expanded.push(node.path);
            }
        });
        setExpandedKeys(expanded)
    }, [setExpandedKeys]);

    return (
        <StyledTreeWrapper>
            <Tree onExpand={onExpand} />
        </StyledTreeWrapper>
    );
};

export default TreeWrapper;