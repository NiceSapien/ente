import { CollectionInfo } from './CollectionInfo';
import React from 'react';
import { Collection, CollectionSummary } from 'types/collection';
import CollectionOptions from 'components/Collections/CollectionOptions';
import { SetCollectionNamerAttributes } from 'components/Collections/CollectionNamer';
import { SpaceBetweenFlex } from 'components/Container';
import { CollectionInfoBarWrapper } from './styledComponents';
import { isSystemCollection } from 'utils/collection';
import { TRASH_SECTION } from 'constants/collection';

interface Iprops {
    activeCollection: Collection;
    collectionSummary: CollectionSummary;
    setCollectionNamerAttributes: SetCollectionNamerAttributes;
    showCollectionShareModal: () => void;
    redirectToAll: () => void;
}

interface Iprops {
    collectionSummary: CollectionSummary;
    setCollectionNamerAttributes: SetCollectionNamerAttributes;
    activeCollection: Collection;
    activeCollectionID: number;
    showCollectionShareModal: () => void;
    redirectToAll: () => void;
}
export default function CollectionInfoWithOptions({
    collectionSummary,
    ...props
}: Iprops) {
    if (!collectionSummary) {
        return <></>;
    }

    const { name, type, fileCount, id } = collectionSummary;

    return (
        <CollectionInfoBarWrapper>
            <SpaceBetweenFlex>
                <CollectionInfo name={name} fileCount={fileCount} />
                {(!isSystemCollection(type) || id === TRASH_SECTION) && (
                    <CollectionOptions {...props} />
                )}
            </SpaceBetweenFlex>
        </CollectionInfoBarWrapper>
    );
}
