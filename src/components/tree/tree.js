import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import values from 'lodash/values';
import TreeNode from "../tree-node/tree-node";
import data from '../../mock/data.json';

const Tree = ({ onExpand }) => {
    const [nodes, setNodes] = useState({});

    useEffect(() => {
        const expandedItems = JSON.parse(localStorage.getItem('treeKeys'));
        const newNodes = {...data};
        expandedItems.forEach(path => {
            newNodes[path].isExpanded = true;
        })
        setNodes({...newNodes});
    }, [])

    const getChildNodes = useCallback((node) => {
        if(!node.children) return [];
        return node.children.map(path => nodes[path]);
    }, [nodes]);

    const onToggle = useCallback((node) => {
        nodes[node.path].isExpanded = !node.isExpanded;
        setNodes({...nodes});
    }, [setNodes, nodes]);

    const rootNodes = useMemo(() => {
        onExpand(nodes);
        return values(nodes).filter(node => node.isRoot === true);
    }, [nodes, onExpand]);

    return (
        <>
            {rootNodes.map(node => (
                <TreeNode
                    key={node.path}
                    node={node}
                    getChildNodes={getChildNodes}
                    onToggle={onToggle}
                />
            ))}
        </>
    );
};

Tree.propTypes = {
    onExpand: PropTypes.func.isRequired
};

export default Tree;