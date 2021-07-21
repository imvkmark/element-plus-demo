import Mock from 'better-mock';

const mkSuccess = (data: any) => {
    return {
        status: 0,
        message: '# Mock Success #',
        ...{
            data: data
        }
    }
}

const mkUserInfo = () => {
    Mock.mock('/api/user/info', mkSuccess({
        'name': '@name',
        bio: '@city',
        blog: '@url'
    }))
}

export const mockAll = () => {
    mkUserInfo()
}
