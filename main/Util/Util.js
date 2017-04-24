const allKeys = {
    'gestureSecret': 'gestureSecret'
};

//统一管理所有本地数据对应的键名，方便查看
export function getKey(key) {
    return allKeys[key];
}
