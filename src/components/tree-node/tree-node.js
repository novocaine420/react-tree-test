import React from 'react';
import PropTypes from 'prop-types';
import { FaPlus, FaMinus } from 'react-icons/fa';
import last from 'lodash/last';
import styled from 'styled-components';

const getNodeLabel = (node) => last(node.path.split('/'));

const getPaddingLeft = (level, type) => {
    let paddingLeft = level * 20;
    if (type === 'file') paddingLeft += 20;
    return paddingLeft;
}

const StyledTreeNode = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 8px;
  padding-left: ${props => getPaddingLeft(props.level, props.type)}px;
  &:hover {
    background: lightgray;
  }
`;

const NodeIcon = styled.div`
  width: 20px;
  font-size: 12px;
  margin-right: ${props => props.marginRight ? props.marginRight : 5}px;
`;


const TreeNode = (props) => {
    const {node, getChildNodes, level = 0, onToggle, onNodeSelect } = props;
    return (
            <>
                <StyledTreeNode level={level} type={node.type}>
                    <NodeIcon onClick={(e) => {
                        e.preventDefault();
                        onToggle(node)
                    }}>
                        { node.children?.length > 0 && (node.isExpanded ? <FaMinus /> : <FaPlus />) }
                    </NodeIcon>

                    <span role="button" onClick={() => onNodeSelect(node)}>
                      { getNodeLabel(node) }
                    </span>
                </StyledTreeNode>

                { node.isExpanded && getChildNodes(node).map(childNode => (
                    <TreeNode
                        {...props}
                        key={childNode.path}
                        node={childNode}
                        level={level + 1}
                    />
                ))}
            </>
    );
};

TreeNode.propTypes = {
    node: PropTypes.object.isRequired,
    getChildNodes: PropTypes.func.isRequired,
    level: PropTypes.number.isRequired,
    onToggle: PropTypes.func.isRequired,
    onNodeSelect: PropTypes.func.isRequired,
};

export default TreeNode;