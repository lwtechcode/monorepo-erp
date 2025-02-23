import { Skeleton as SkeletonBase } from 'antd';
import { AvatarProps } from 'antd/es/skeleton/Avatar';

function Skeleton({ ...props }: AvatarProps) {
  return <SkeletonBase {...props} />;
}

Skeleton.Avatar = SkeletonBase.Avatar;
Skeleton.Button = SkeletonBase.Button;
Skeleton.Image = SkeletonBase.Image;
Skeleton.Input = SkeletonBase.Input;
Skeleton.Node = SkeletonBase.Node;

export default Skeleton;
