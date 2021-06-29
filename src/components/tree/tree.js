import React, {useCallback, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import values from 'lodash/values';
import TreeNode from "../tree-node/tree-node";

const data = {
    '/root': {
        path: '/root',
        isRoot: true,
        isExpanded: true,
        children: ['/root/david', '/root/jslancer'],
    },
    '/root/david': {
        path: '/root/david',
        children: ['/root/david/readme.md'],
    },
    '/root/david/readme.md': {
        path: '/root/david/readme.md'
    },
    '/root/jslancer': {
        path: '/root/jslancer',
        children: ['/root/jslancer/projects', '/root/jslancer/vblogs'],
    },
    '/root/jslancer/projects': {
        path: '/root/jslancer/projects',
        children: ['/root/jslancer/projects/treeview'],
    },
    '/root/jslancer/projects/treeview': {
        path: '/root/jslancer/projects/treeview',
        children: [],
    },
    '/root/jslancer/vblogs': {
        path: '/root/jslancer/vblogs',
        children: [],
    },
}

const Tree = ({ onSelect }) => {
    const [nodes, setNodes] = useState(data);

    const getChildNodes = useCallback((node) => {
        if(!node.children) return [];
        return node.children.map(path => nodes[path]);
    }, [nodes]);

    const onToggle = useCallback((node) => {
        console.log('clicked', node);
        nodes[node.path].isExpanded = !node.isExpanded;
        setNodes({...nodes});
    }, [setNodes, nodes]);

    const rootNodes = useMemo(() => {
        return values(nodes).filter(node => node.isRoot === true);
    }, [nodes]);

    return (
        <>
            {rootNodes.map(node => (
                <TreeNode
                    key={node.path}
                    node={node}
                    getChildNodes={getChildNodes}
                    onToggle={onToggle}
                    onNodeSelect={onSelect}
                />
            ))}
        </>
    );
};

Tree.propTypes = {
    onSelect: PropTypes.func.isRequired
};

export default Tree;