import { PropTypes } from "prop-types";

export const QualitiesTypes = {
    quality: PropTypes.shape([
        {
            _id: PropTypes.string,
            name: PropTypes.string,
            color: PropTypes.string
        }
    ])
};

export const ProfessionTypes = PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string
});

export const UserTypes = {
    user: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        completedMeetings: PropTypes.number,
        rate: PropTypes.number,
        favorite: PropTypes.bool,
        quality: QualitiesTypes,
        professions: ProfessionTypes
    }),
    onRemove: PropTypes.func.isRequired,
    onPickFavorite: PropTypes.func.isRequired
};

export const UsersTypes = {
    users: PropTypes.arrayOf(PropTypes.shape(
        {
            user: UserTypes
        }
    )),
    onRemove: PropTypes.func.isRequired,
    onPickFavorite: PropTypes.func.isRequired
};

export const PaginationTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired
};

export const SearchTypes = {
    countUsers: PropTypes.number
};

export const BookmarkTypes = {
    id: PropTypes.string,
    favorite: PropTypes.bool,
    onPickFavorite: PropTypes.func.isRequired
};

export const GroupListTypes = {
    professions: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onItemSelect: PropTypes.func.isRequired,
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired

};
