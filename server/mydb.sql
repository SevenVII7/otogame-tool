-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- 主機： localhost
-- 產生時間： 2024 年 07 月 13 日 12:45
-- 伺服器版本： 10.4.21-MariaDB
-- PHP 版本： 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫: `mydb`
--

-- --------------------------------------------------------

--
-- 資料表結構 `movies`
--

CREATE TABLE `movies` (
  `id` int(11) NOT NULL,
  `yt_id` varchar(255) NOT NULL,
  `list_id` int(11) NOT NULL,
  `video_name` varchar(255) DEFAULT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `movies`
--

INSERT INTO `movies` (`id`, `yt_id`, `list_id`, `video_name`, `img_url`, `created_at`) VALUES
(40, 'YyV9jowj9PY', 21, '『glow』3DMVゲームサイズ公開！', 'https://i.ytimg.com/vi/YyV9jowj9PY/sddefault.jpg', '2023-06-25 13:42:37'),
(41, 'BAdZ-AGlgl8', 21, '『チームメイト』（難易度：HARD）プレイ動画を公開', 'https://i.ytimg.com/vi/BAdZ-AGlgl8/sddefault.jpg', '2023-06-25 13:43:03'),
(42, 'tpo-bnAAn9g', 21, '『人生』（難易度：MASTER）プレイ動画を公開', 'https://i.ytimg.com/vi/tpo-bnAAn9g/sddefault.jpg', '2023-06-25 13:43:42'),
(43, '081acCsfx0I', 21, '『命ばっかり』（難易度：HARD）プレイ動画を公開', 'https://i.ytimg.com/vi/081acCsfx0I/sddefault.jpg', '2023-06-25 13:44:09'),
(48, 'SucdonufAvE', 24, '[SDVX] MEGALOVANIA [EXH 16] (譜面確認)', 'https://i.ytimg.com/vi/SucdonufAvE/sddefault.jpg', '2023-06-25 15:03:02'),
(49, 'vGHIibZT8Y0', 21, '『とても素敵な六月でした』3DMVゲームサイズ公開！', 'https://i.ytimg.com/vi/vGHIibZT8Y0/sddefault.jpg', '2023-07-01 14:22:05'),
(51, 'dXumRYQzs2s', 21, 'チームメイト / MORE MORE JUMP！ × 鏡音レン', 'https://i.ytimg.com/vi/dXumRYQzs2s/sddefault.jpg', '2023-07-01 14:34:28'),
(53, 'vGHIibZT8Y0', 31, '『とても素敵な六月でした』3DMVゲームサイズ公開！', 'https://i.ytimg.com/vi/vGHIibZT8Y0/sddefault.jpg', '2023-07-01 14:38:32'),
(57, 'lMXlOPGjwUI', 31, 'Iなんです / 25時、ナイトコードで。 × 初音ミク', 'https://i.ytimg.com/vi/lMXlOPGjwUI/sddefault.jpg', '2023-07-01 14:41:35'),
(58, 'eGzk1oYX7p4', 21, '【프로젝트 세카이】 정말 멋진 6월이었습니다(とても素敵な六月でした) [MASTER Lv.29] ALL PERFECT', 'https://i.ytimg.com/vi/eGzk1oYX7p4/sddefault.jpg', '2023-07-01 15:50:40'),
(59, 's4vdxVVb3wA', 21, '【프로젝트 세카이】 정지 기믹 등장?! - 샨티(シャンティ) [MASTER Lv.30] ALL PERFECT', 'https://i.ytimg.com/vi/s4vdxVVb3wA/sddefault.jpg', '2023-07-01 15:55:22'),
(60, 'Brap_tO3Jj0', 31, 'フロート・プランナー / MORE MORE JUMP！ × 鏡音リン', 'https://i.ytimg.com/vi/Brap_tO3Jj0/sddefault.jpg', '2023-07-01 16:27:38'),
(61, 'nTJGH1XOjlQ', 35, '【プロセカお正月キャンペーン】イラストメイキングムービー Art by 萩森じあ', 'https://i.ytimg.com/vi/nTJGH1XOjlQ/sddefault.jpg', '2023-07-18 13:48:41'),
(62, 'WjOOm4SAeHI', 31, '『演劇 』3DMVゲームサイズ公開！', 'https://i.ytimg.com/vi/WjOOm4SAeHI/sddefault.jpg', '2023-07-19 14:46:42'),
(63, 'Qu4oqtVmBck', 31, '星を繋ぐ / Leo/need × KAITO', 'https://i.ytimg.com/vi/Qu4oqtVmBck/sddefault.jpg', '2023-07-30 14:11:51'),
(73, 'uZDVnjpnTIQ', 31, '【イラスト講座】キラキラした目の塗り方【パルミー】', 'https://i.ytimg.com/vi/uZDVnjpnTIQ/sddefault.jpg', '2023-07-31 16:06:59'),
(74, 'uZDVnjpnTIQ', 31, '【イラスト講座】キラキラした目の塗り方【パルミー】', 'https://i.ytimg.com/vi/uZDVnjpnTIQ/sddefault.jpg', '2023-07-31 16:07:22'),
(75, '5YoBbxgG7XE', 31, '［Rom/Kan/Eng］Wonderlands x Showtime-88☆彡', 'https://i.ytimg.com/vi/5YoBbxgG7XE/sddefault.jpg', '2023-07-31 16:08:39'),
(76, '5YoBbxgG7XE', 31, '［Rom/Kan/Eng］Wonderlands x Showtime-88☆彡', 'https://i.ytimg.com/vi/5YoBbxgG7XE/sddefault.jpg', '2023-07-31 16:11:36'),
(77, 'Dn4U6RQ0i3c', 31, 'ギターと孤独と蒼い惑星/結束バンド【弾き語りカバー】', 'https://i.ytimg.com/vi/Dn4U6RQ0i3c/sddefault.jpg', '2023-08-03 15:22:21'),
(79, 'CUQlFbFftRc', 31, '[GAME SIZE] Nightcord at 25:00 - 妄想感傷代償連盟/Mousou Kanshou Daishou Renmei | 歌詞 Color Coded Lyrics プロセカ', 'https://i.ytimg.com/vi/CUQlFbFftRc/sddefault.jpg', '2023-08-03 17:00:07'),
(80, 'JMC3mquZU-g', 31, '大正浪漫 / 緋月ゆい cover', 'https://i.ytimg.com/vi/JMC3mquZU-g/sddefault.jpg', '2024-01-05 14:57:36'),
(81, 'JMC3mquZU-g', 31, '大正浪漫 / 緋月ゆい cover', 'https://i.ytimg.com/vi/JMC3mquZU-g/sddefault.jpg', '2024-01-05 14:59:57'),
(83, 'nwak-vw1xlI', 73, '【maimaiDX UNiVERSE】needLe MASTER DX AP【外部出力】', 'https://i.ytimg.com/vi/nwak-vw1xlI/sddefault.jpg', '2024-07-13 09:19:52');

-- --------------------------------------------------------

--
-- 資料表結構 `movie_list`
--

CREATE TABLE `movie_list` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `movie_list`
--

INSERT INTO `movie_list` (`id`, `name`, `created_at`) VALUES
(21, 'PJSK 譜面', '2023-06-25 08:33:34'),
(31, '純聽歌歌單', '2023-07-01 14:37:25'),
(73, 'Maimai', '2024-07-13 09:19:45');

-- --------------------------------------------------------

--
-- 資料表結構 `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `deparment` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `students`
--

INSERT INTO `students` (`id`, `name`, `age`, `email`, `deparment`) VALUES
(1, 'leon', 20, 'leon@leon.com', 'CS'),
(4, 'new name', 21, 'leon@leon.leon', 'CS2'),
(5, 'new name', 30, 'leon@leon.leon', 'CS2'),
(8, 'new name', 80, 'leon@leon.leon', 'apple80');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `movie_list`
--
ALTER TABLE `movie_list`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `movie_list`
--
ALTER TABLE `movie_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
