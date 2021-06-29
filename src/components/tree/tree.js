import React, {useCallback, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import values from 'lodash/values';
import TreeNode from "../tree-node/tree-node";

const data = {
    'a.com': {
        path: 'a.com',
        isRoot: true,
        isExpanded: true,
        children: ['a.com/shopping', 'a.com/blog'],
    },
    'a.com/shopping': {
        path: 'a.com/shopping',
        children: ['a.com/shopping/page1.html', 'a.com/shopping/page2.html', 'a.com/shopping/cart'],
    },
    'a.com/shopping/page1.html': {
        path: 'a.com/shopping/page1.html',
    },
    'a.com/shopping/page2.html': {
        path: 'a.com/shopping/page2.html'
    },
    'a.com/shopping/cart': {
        path: 'a.com/shopping/cart',
        children: ['a.com/shopping/cart/page1.html'],
    },
    'a.com/shopping/cart/page1.html': {
        path: 'a.com/shopping/cart/page1.html'
    },
    'a.com/blog': {
        path: 'a.com/blog',
        children: ['a.com/blog/blog1.html', 'a.com/blog/blog2.html'],
    },
    'a.com/blog/blog1.html': {
        path: 'a.com/blog/blog1.html',
    },
    'a.com/blog/blog2.html': {
        path: 'a.com/blog/blog2.html',
    },
}

const Tree = ({ onSelect }) => {
    const [nodes, setNodes] = useState(data);

    const getChildNodes = useCallback((node) => {
        if(!node.children) return [];
        return node.children.map(path => nodes[path]);
    }, [nodes]);

    const onToggle = useCallback((node) => {
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