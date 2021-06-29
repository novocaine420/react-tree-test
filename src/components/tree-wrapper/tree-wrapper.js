import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import Tree from "../tree/tree";

const StyledTreeWrapper = styled.div`
  width: 800px;
  max-width: 100%;
  margin: 0 auto;
  display: flex;  
  flex-direction: column;
`;

const TreeWrapper = () => {
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        console.log('Selected = ', selected);
    }, [selected]);

    const onSelect = useCallback((node) => {
        setSelected(node);
    }, [setSelected]);

    return (
        <StyledTreeWrapper>
            <Tree onSelect={onSelect} />
        </StyledTreeWrapper>
    );
};

export default TreeWrapper;