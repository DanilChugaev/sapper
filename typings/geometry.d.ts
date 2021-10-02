/** Ячейка игрового поля */
type Cell = number;
/** Кол-во ячеек игрового поля */
type CellAmount = number;
/** Кол-во ячеек игрового поля */
type Length = CellAmount;

/** Ширина и длина некой сущности игрового поля */
type Size = {
    width: Length;
    height: Length;
};